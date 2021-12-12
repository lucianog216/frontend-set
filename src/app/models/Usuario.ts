export interface usuario {
  uid?:     string; 
    estado?:  boolean;
    google?:  boolean;
    nombre:   string;     
    apellido: string;
    celular:  number
    password: string;
    correo:   string;
    region:  {_id:string,
      nombre:string};
    ciudad:    string;
    direccion: string;
    rut:      string;
    rol:      string;
    img:      string;
  


}