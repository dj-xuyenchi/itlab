package it.lab.exception;

public class NotFoundException extends RuntimeException{
    public NotFoundException(Long id){
        super("Could not found the user with id"+id);
    }

}
