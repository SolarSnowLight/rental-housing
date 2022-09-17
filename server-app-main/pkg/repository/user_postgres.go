package repository

import (
	"encoding/json"
	"errors"
	"fmt"
	actionConstant "main-server/pkg/constant/action"
	middlewareConstant "main-server/pkg/constant/middleware"
	objectConstant "main-server/pkg/constant/object"
	tableConstant "main-server/pkg/constant/table"
	companyModel "main-server/pkg/model/company"
	userModel "main-server/pkg/model/user"

	"strconv"

	"github.com/casbin/casbin/v2"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/spf13/viper"
	"golang.org/x/crypto/bcrypt"
)

type UserPostgres struct {
	db       *sqlx.DB
	enforcer *casbin.Enforcer
	domain   *DomainPostgres
}

/*
* Функция создания экземпляра сервиса
 */
func NewUserPostgres(db *sqlx.DB, enforcer *casbin.Enforcer, domain *DomainPostgres) *UserPostgres {
	return &UserPostgres{
		db:       db,
		enforcer: enforcer,
		domain:   domain,
	}
}

func (r *UserPostgres) GetUser(column, value interface{}) (userModel.UserModel, error) {
	var user userModel.UserModel
	query := fmt.Sprintf("SELECT * FROM %s WHERE %s=$1", tableConstant.USERS_TABLE, column.(string))

	var err error

	switch value.(type) {
	case int:
		err = r.db.Get(&user, query, value.(int))
		break
	case string:
		err = r.db.Get(&user, query, value.(string))
		break
	}

	return user, err
}

func (r *UserPostgres) GetProfile(c *gin.Context) (userModel.UserProfileModel, error) {
	usersId, _ := c.Get(middlewareConstant.USER_CTX)

	var profile userModel.UserProfileModel
	var email userModel.UserEmailModel

	query := fmt.Sprintf("SELECT data FROM %s tl WHERE tl.users_id = $1 LIMIT 1",
		tableConstant.USERS_DATA_TABLE,
	)

	err := r.db.Get(&profile, query, usersId)
	if err != nil {
		return userModel.UserProfileModel{}, err
	}

	query = fmt.Sprintf("SELECT email FROM %s tl WHERE tl.id = $1 LIMIT 1", tableConstant.USERS_TABLE)

	err = r.db.Get(&email, query, usersId)
	if err != nil {
		return userModel.UserProfileModel{}, err
	}

	return userModel.UserProfileModel{
		Email: email.Email,
		Data:  profile.Data,
	}, nil
}

func (r *UserPostgres) UpdateProfile(c *gin.Context, data userModel.UserProfileUpdateDataModel) (userModel.UserJSONBModel, error) {
	usersId, _ := c.Get(middlewareConstant.USER_CTX)

	userJsonb, err := json.Marshal(data)
	if err != nil {
		return userModel.UserJSONBModel{}, err
	}

	tx, err := r.db.Begin()
	if err != nil {
		return userModel.UserJSONBModel{}, err
	}

	query := fmt.Sprintf("UPDATE %s tl SET data=$1 WHERE tl.users_id = $2", tableConstant.USERS_DATA_TABLE)

	// Update data about user profile
	_, err = tx.Exec(query, userJsonb, usersId)
	if err != nil {
		tx.Rollback()
		return userModel.UserJSONBModel{}, err
	}

	query = fmt.Sprintf("SELECT data FROM %s tl WHERE users_id=$1 LIMIT 1", tableConstant.USERS_DATA_TABLE)
	var userData []userModel.UserDataModel

	err = r.db.Select(&userData, query, usersId)

	if err != nil {
		tx.Rollback()
		return userModel.UserJSONBModel{}, err
	}

	if len(userData) <= 0 {
		tx.Rollback()
		return userModel.UserJSONBModel{}, errors.New("Данных у пользователя нет")
	}

	var dataFromJson userModel.UserJSONBModel
	err = json.Unmarshal([]byte(userData[0].Data), &dataFromJson)

	if err != nil {
		tx.Rollback()
		return userModel.UserJSONBModel{}, err
	}

	// Change password
	if data.Password != nil {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*data.Password), viper.GetInt("crypt.cost"))
		if err != nil {
			tx.Rollback()
			return userModel.UserJSONBModel{}, err
		}

		query := fmt.Sprintf("UPDATE %s SET password=$1 WHERE id=$2", tableConstant.USERS_TABLE)
		_, err = r.db.Exec(query, string(hashedPassword), usersId)

		if err != nil {
			tx.Rollback()
			return userModel.UserJSONBModel{}, err
		}
	}

	err = tx.Commit()

	if err != nil {
		tx.Rollback()
		return userModel.UserJSONBModel{}, err
	}

	return dataFromJson, nil
}

func (r *UserPostgres) GetUserCompany(userId, domainId int) (companyModel.CompanyDbModelEx, error) {
	allRules := r.enforcer.GetPermissionsForUser(strconv.Itoa(userId), strconv.Itoa(domainId))
	rules := make([][]string, 0)

	for i := 0; i < len(allRules); i++ {
		element := allRules[i]

		if (element[len(element)-1] == actionConstant.ADMINISTRATION) || (element[len(element)-1] == actionConstant.MANAGEMENT) {
			rules = append(rules, element)
		}
	}

	query := fmt.Sprintf(`
			SELECT DISTINCT %s.value
			FROM %s tl
			JOIN %s tr ON tr.id = tl.types_objects_id
			WHERE tr.value = $1
	`, tableConstant.OBJECTS_TABLE, tableConstant.OBJECTS_TABLE, tableConstant.TYPES_OBJECTS_TABLE)

	var companyUuid []string
	err := r.db.Select(&companyUuid, query, objectConstant.TYPE_COMPANY)
	if err != nil {
		return companyModel.CompanyDbModelEx{}, err
	}

	for i := 0; i < len(rules); i++ {
		for j := 0; j < len(rules[i]); j++ {
			fmt.Print(rules[i][j] + " ")
		}
		fmt.Println()
	}

	return companyModel.CompanyDbModelEx{}, nil
}
