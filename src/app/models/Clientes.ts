export interface Clientes {
    _id:     string; 
    estado?:  boolean;
    nombre:   string;     
    rut: string;
    celular:  number;
    correo:   string;
    region:  string;
    direccion: string
    ciudad:  string;
    usuario: {_id:string,
       nombre:string};
    }