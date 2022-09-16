package repository

import (
	adminModel "main-server/pkg/model/admin"
	projectModel "main-server/pkg/model/project"
	rbacModel "main-server/pkg/model/rbac"
	userModel "main-server/pkg/model/user"

	"github.com/casbin/casbin/v2"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"golang.org/x/oauth2"
)

type Authorization interface {
	// Main routes for user authenticated
	CreateUser(user userModel.UserRegisterModel) (userModel.UserAuthDataModel, error)
	UploadProfileImage(c *gin.Context, filepath string) (bool, error)
	LoginUser(user userModel.UserLoginModel) (userModel.UserAuthDataModel, error)
	LoginUserOAuth2(code string) (userModel.UserAuthDataModel, error)
	CreateUserOAuth2(user userModel.UserRegisterOAuth2Model, token *oauth2.Token) (userModel.UserAuthDataModel, error)
	Refresh(data userModel.TokenLogoutDataModel, refreshToken string, token userModel.TokenOutputParse) (userModel.UserAuthDataModel, error)
	Logout(tokens userModel.TokenLogoutDataModel) (bool, error)
	Activate(link string) (bool, error)

	// Get user information
	GetUser(column, value string) (userModel.UserModel, error)
	GetRole(column, value string) (rbacModel.RoleModel, error)

	// Recovery password
	RecoveryPassword(email string) (bool, error)
	ResetPassword(data userModel.ResetPasswordModel, token userModel.ResetTokenOutputParse) (bool, error)
}

type Role interface {
	GetRole(column, value interface{}) (rbacModel.RoleModel, error)
	HasRole(usersId, domainsId int, roleValue string) (bool, error)
}

type Domain interface {
	GetDomain(column, value interface{}) (rbacModel.DomainModel, error)
}

type User interface {
	GetUser(column, value interface{}) (userModel.UserModel, error)

	// Profile
	GetProfile(c *gin.Context) (userModel.UserProfileModel, error)
	UpdateProfile(c *gin.Context, data userModel.UserProfileUpdateDataModel) (userModel.UserJSONBModel, error)
}

type Admin interface {
	GetAllUsers(c *gin.Context) (adminModel.UsersResponseModel, error)
	CreateCompany(c *gin.Context, data adminModel.CompanyModel) (adminModel.CompanyModel, error)
}

type AuthType interface {
	GetAuthType(column, value interface{}) (userModel.AuthTypeModel, error)
}

type Project interface {
	CreateProject(userId, domainId int, data projectModel.ProjectModel) (projectModel.ProjectModel, error)
	AddLogoProject(userId, domainId int, data projectModel.ProjectLogoModel) (projectModel.ProjectLogoModel, error)
	GetProject(userId, domainId int, data projectModel.ProjectUuidModel) (projectModel.ProjectDbModel, error)
	GetProjects(userId, domainId int, data projectModel.ProjectCountModel) (projectModel.ProjectAnyCountModel, error)
}

type Repository struct {
	Authorization
	Role
	Domain
	User
	Admin
	AuthType

	Project
}

func NewRepository(db *sqlx.DB, enforcer *casbin.Enforcer) *Repository {
	domain := NewDomainPostgres(db)
	user := NewUserPostgres(db, enforcer, domain)
	admin := NewAdminPostgres(db, enforcer, domain)
	project := NewProjectPostgres(db, enforcer)

	return &Repository{
		Authorization: NewAuthPostgres(db, enforcer, *user),
		Role:          NewRolePostgres(db, enforcer),
		Domain:        domain,
		User:          user,
		Admin:         admin,
		AuthType:      NewAuthTypePostgres(db),
		Project:       project,
	}
}
