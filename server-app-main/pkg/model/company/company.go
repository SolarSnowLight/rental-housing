package company

/* Company UUID model */
type CompanyUuidModel struct {
	Uuid string `json:"uuid" binding:"required"`
}
