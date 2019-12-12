package com.projetobase.application.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		/*http.csrf().disable();
		http.headers().frameOptions().disable();

		http.authorizeRequests()
			.antMatchers("/" ).fullyAuthenticated()
			.anyRequest()
			.authenticated()
			.and()
			.formLogin()
			.usernameParameter( "email" )
			.passwordParameter( "password" )
			.loginPage( "/authentication" )
			.loginProcessingUrl( "/authenticate" )
			.failureHandler( this.authenticationFailureHandler )
			.successHandler( this.authenticationSuccessHandler )
			.permitAll()
			.and()
			.logout()
			.logoutUrl( "/logout" );
		http.csrf().disable().
		authorizeRequests().
		anyRequest()
		.authenticated()
		.and()
		.formLogin()
		.defaultSuccessUrl("/index")
		.and().httpBasic().disable();*/
		
		http.cors().and().csrf().disable()
		.authorizeRequests()
			.antMatchers( "/api/*" ).permitAll();
	}
	
}
