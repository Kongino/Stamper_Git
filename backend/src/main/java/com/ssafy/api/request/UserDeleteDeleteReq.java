package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserDeleteDeleteRequest")
public class UserDeleteDeleteReq {

    @ApiModelProperty(name = "Current Password")
    String currentPassword;

}
