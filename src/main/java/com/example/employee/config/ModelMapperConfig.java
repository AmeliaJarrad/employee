package com.example.employee.config;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration.AccessLevel;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Important: Enable skipping nulls and allow field-level access
        modelMapper.getConfiguration()
            .setSkipNullEnabled(true)
            .setFieldMatchingEnabled(true)
            .setFieldAccessLevel(AccessLevel.PRIVATE); // <-- allows mapping to private fields like 'isArchived'

        // Trim strings on mapping
        modelMapper.typeMap(String.class, String.class).setConverter(new StringTrimConverter());

        return modelMapper;
    }

    private static class StringTrimConverter implements Converter<String, String> {
        @Override
        public String convert(MappingContext<String, String> context) {
            if (context.getSource() == null) {
                return null;
            }
            return context.getSource().trim();
        }
    }
}

