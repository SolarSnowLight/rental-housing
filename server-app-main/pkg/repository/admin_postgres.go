package repository

import (
	//middlewareConstant "main-server/pkg/constant/middleware"
	"fmt"
	tableConstant "main-server/pkg/constant/table"
	adminModel "main-server/pkg/model/admin"

	"github.com/casbin/casbin/v2"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

type AdminPostgres struct {
	db       *sqlx.DB
	enforcer *casbin.Enforcer
	domain   *DomainPostgres
}

/* Function for create new struct of AdminPostgres */
func NewAdminPostgres(db *sqlx.DB, enforcer *casbin.Enforcer, domain *DomainPostgres) *AdminPostgres {
	return &AdminPostgres{
		db:       db,
		enforcer: enforcer,
		domain:   domain,
	}
}

/* Method for get all users, when location in system */
func (r *AdminPostgres) GetAllUsers(c *gin.Context) (adminModel.UsersResponseModel, error) {
	/*usersId, _ := c.Get(middlewareConstant.USER_CTX)
	domainsId, _ := c.Get(middlewareConstant.DOMAINS_ID)*/

	// Select all users without ban
	query := fmt.Sprintf(`SELECT email FROM %s`, tableConstant.USERS_TABLE)
	var users []adminModel.UserResponseModel

	if err := r.db.Select(&users, query); err != nil {
		return adminModel.UsersResponseModel{}, err
	}

	return adminModel.UsersResponseModel{
		Users: &users,
	}, nil
}
