package com.ghostjson.xmeme.configurations;

import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


/**
 * Swagger configurations
 * **/

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    // Documentation attributes
    private final String TITLE = "Xmeme API";
    private final String DESCRIPTION = "Xmeme is a web application used to explore and share memes.";
    private final String VERSION = "V1.0.0";
    private final String LICENSE = "MIT";
    private final String LICENSE_URL = "https://opensource.org/licenses/MIT";

    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(this.apiInfo())
                .select()
                .apis(Predicates.not(
                        RequestHandlerSelectors.basePackage("org.springframework.boot"))
                )
                .build();
    }

    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title(TITLE)
                .description(DESCRIPTION)
                .version(VERSION)
                .license(LICENSE)
                .licenseUrl(LICENSE_URL)
                .build();

    }

}
