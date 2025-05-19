package com.example.Hockey.API.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "one_time_pin")
public class OneTimeCodeModel {
    @Id
    @Column(name = "otp_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int otp_id;
    @Column(name = "pin_code",nullable = false)
    private int code;
    @Column(nullable = false,name = "user_id")
    private int user_id;

    public int getOtp_id() {
        return otp_id;
    }

    public void setOtp_id(int otp_id) {
        this.otp_id = otp_id;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
