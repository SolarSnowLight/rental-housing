package handler

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"

	_ "main-server/docs"

	route "main-server/pkg/constant/route"
	service "main-server/pkg/service"

	_ "github.com/swaggo/files"
	swaggerFiles "github.com/swaggo/files"
	_ "github.com/swaggo/gin-swagger"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

/* Инициализация маршрутов */
func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	router.MaxMultipartMemory = 50 << 20 // 50 MiB
	router.Static("/public", "./public")

	router.LoadHTMLGlob("pkg/template/*")

	// Настройка CORS-политики
	router.Use(cors.New(cors.Config{
		//AllowAllOrigins: true,
		AllowOrigins:     []string{viper.GetString("client_url"), viper.GetString("crm_url")},
		AllowMethods:     []string{"POST", "GET"},
		AllowHeaders:     []string{"Origin", "Content-type", "Authorization"},
		AllowCredentials: true,
	}))

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// A group of routes for user authorization
	auth := router.Group(route.AUTH_MAIN_ROUTE)
	{
		auth.POST(route.AUTH_SIGN_UP_ROUTE, h.signUp)
		auth.POST(route.AUTH_SIGN_IN_ROUTE, h.signIn)
		auth.POST(route.AUTH_SIGN_IN_GOOGLE_ROUTE, h.signInOAuth2)
		auth.GET(route.AUTH_ACTIVATE_ROUTE, h.activate)

		// With middlewares (for get data from access token)
		auth.POST(route.AUTH_REFRESH_TOKEN_ROUTE, h.userIdentityLogout, h.refresh)
		auth.POST(route.AUTH_LOGOUT_ROUTE, h.userIdentity, h.logout)
		auth.POST(route.AUTH_UPLOAD_PROFILE_IMAGE, h.uploadProfileImage, h.userIdentity)

		// Recover password
		auth.POST(route.AUTH_RECOVERY_PASSWORD, h.recoveryPassword)
		auth.POST(route.AUTH_RESET_PASSWORD, h.resetPassword)
	}

	// Route group for the user
	user := router.Group(route.USER_MAIN_ROUTE, h.userIdentity)
	{
		profile := user.Group(route.USER_PROFILE_ROUTE)
		{
			profile.POST(route.GET_ROUTE, h.getProfile)
			profile.POST(route.UPDATE_ROUTE, h.updateProfile)
		}
	}

	admin := router.Group(route.ADMIN_MAIN_ROUTE, h.userIdentity)
	{
		user := admin.Group(route.ADMIN_USER)
		{
			user.POST(route.GET_ALL_ROUTE, h.getAllUsers)
		}
	}

	return router
}
