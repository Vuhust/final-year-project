package com.hust.backend_password_manager.config.persistence;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.hust.backend_password_manager.repository.salt_entity",
        entityManagerFactoryRef = "saltEntityManager",
        transactionManagerRef = "saltTransactionManager"
)
public class SaltPersistence {


    @Value( "${hibernate.hbm2ddl.auto}" )
    String auto;

    @Value( "${spring.datasource.driver-class-name}" )
    String driverClassName;

    @Value( "${spring.datasource.salt.url}" )
    String url;

    @Value( "${spring.datasource.salt.username}" )
    String user;

    @Value( "${spring.datasource.salt.password}" )
    String pass;

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean saltEntityManager() {
        LocalContainerEntityManagerFactoryBean em
                = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(saltDataSource());
        em.setPackagesToScan("com.hust.backend_password_manager.entity.salt_entity");
        HibernateJpaVendorAdapter vendorAdapter
                = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", auto);
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Primary
    @Bean
    public DataSource saltDataSource() {

        DriverManagerDataSource dataSource
                = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(user);
        dataSource.setPassword(pass);

        return dataSource;
    }

    @Primary
    @Bean
    public PlatformTransactionManager saltTransactionManager() {

        JpaTransactionManager transactionManager
                = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(
                saltEntityManager().getObject());
        return transactionManager;
    }


}


