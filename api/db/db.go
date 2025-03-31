package db

import (
	"database/sql"
	"fmt"
	"strconv"

	"github.com/sebzz2k2/hls/api/config"
)

var DB *sql.DB

func Connect() error {
	var err error
	p := config.Config("DB_PORT")
	port, err := strconv.ParseUint(p, 10, 32)
	if err != nil {
		fmt.Println("Error parsing str to int")
	}
	DB, err = sql.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", config.Config("DB_HOST"), port, config.Config("DB_USER"), config.Config("DB_PASSWORD"), config.Config("DB_NAME")))

	if err != nil {
		return err
	}
	if err = DB.Ping(); err != nil {
		return err
	}

	// create tables
	_, err = DB.Exec(CreateUsersTable())
	if err != nil {
		return fmt.Errorf("failed to create users table: %v", err)
	}

	fmt.Println("Connection Opened to Database")
	return nil
}
