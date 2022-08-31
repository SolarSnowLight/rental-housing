package handler

import (
	adminModel "main-server/pkg/model/admin"
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary GetAllUsers
// @Tags admin
// @Description Get all users, which are located in system
// @ID get-all-users
// @Accept  json
// @Produce  json
// @Success 200 {object} adminModel.UsersResponseModel "data"
// @Failure 400,404 {object} errorResponse
// @Failure 500 {object} errorResponse
// @Failure default {object} errorResponse
// @Router /admin/user/get/all [post]
func (h *Handler) getAllUsers(c *gin.Context) {
	var data adminModel.UsersResponseModel

	data, err := h.services.Admin.GetAllUsers(c)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, data)
}
