
export interface RESTListarUsuario {
    total:    number;
    usuarios: Usuario[];
    results: results[];
    Total:   number;
    teams: teams["guardias"];

}
export interface RESTListarUsuario2 {
    
    teams: teams["guardias"];

}

export interface servicio{
    title: string;
    descripcion: string;
    turno: string; 
    date: string;
}

export interface login{
    password: string;
    nombre:   string;
    correo:   string;
    rol: string;
    
}

export interface Login{
    id_token: string
}

export interface Usuario {
    uid:     string; 
      estado?:  boolean;
      google?:  boolean;
      nombre:   string;     
      apellido: string;
      celular:  number
      password: string;
      correo:   string;
      region:{_id:string,
        nombre:string};
      ciudad:    string;
      direccion: string;
      rut:      string;
      rol:      string;
      img:      string;
    


}
export interface results{
    estado?:   boolean;
    google?:   boolean;
    password: string;
    uid:      string;
    nombre:   string;
    celular:  number;
    apellido: string;
    correo:   string;
    rol:      string;
    img:      string;
    team: {
        nombre:string,
        _id:string
    };
}

export interface Results{

    estado?:   boolean;
    google?:   boolean;
    password: string;
    uid:      string;
    nombre:   string;
    celular:  number;
    apellido: string;
    correo:   string;
    rol:      string;
    img:      string;
}

export interface clientes {
    _id?:     string; 
    estado?:  boolean;
    nombre:   string;     
    rut:       string;
    celular:  number;
    correo:   string;
    region:    string,
    ciudad:    string,
    nivel:     string,
    empresa:   string,
    direccion: string;
    usuario: {_id:string,
          nombre:string};

    } 
export interface turnos {
    _id?:     string; 
    nombre:   string; 
    ingreso: string;
    salida: string;
    horas: number;
    colacion: string;
    usuario: {_id:string,
        nombre:string}
    }
export interface teams {
   
    _id?:     string; 
    nombre:   string; 
    nivel:   number;
    
    supervisor: {_id:string,
        nombre:string
    }; 
           
    usuario: {_id:string,
        nombre:string
    };

    guardias:[
        {
            _id: string,
            nombre: string,
        }
    ];
}


export interface teamguard{
    guardia: string;
    _id?:     string; 
    nombre: string;
    apellido: string;
    correo: string;
    ciudad: string;
    guardias:[
        {
            _id: string,
            
        }
    ];
}

export interface img{
    img: string;
}


export interface TESTRESP {
    total: number;
    teams: TeamRESP[];
}

export interface TeamRESP {
    color:       string;
    nivel:       number;
    guardias:    SupervisorRESP[];
    _id:         string;
    nombre:      string;
    usuario:     SupervisorRESP;
    supervisor?: SupervisorRESP;
}

export interface SupervisorRESP {
    _id:    string;
    nombre: string;
}


    
export interface regionesRESP {
    total:    number;
    regiones: Regione[];
}

export interface Regione {
    ciudades: string[];
    estado:   boolean;
    nombre:   string;
    id:       string;
}
 //servicios
export interface RESTListarServi {
    total:     number;
    servicios: Servicio[];
}

export interface Servicio {
    observacion: any[];
    imagenes:    any[];
    estado:      boolean;
    evento?:     any[];
    title:      string;
    descripcion: string;
    turno:       Cliente;
    usuario?:    string;
    start:        string;
    end:        string;
    date:      Date;
    id:          string;
    usuarioIn?:  Cliente;
    termino?:    Date;
    usuarioOut?: Cliente;
    team?:       Cliente | null;
    cliente?:    Cliente;
}

export interface IEvent {
    title: string,
    start: string,
    end: string,
}
 
export interface IEvent2 {
    

    title: string,
    start: string,
    end: string,
        
    

}
export interface IEvent1 {
    id?: string;
    title: string;
    start: string;
    end: string;
    descripcion: string;
   
    
}
export interface evet2{
    desde: Date;
    hasta: Date;
}




export interface Cliente {
    _id:    string;
    nombre: string;
}
export interface teamcliente{
    cliente:string;
}

export interface borrarGuardiaEquipo{
    guardia:string
}
export interface turneros{
    guardia: string;
    inicio: Date;
    team: string;
    cliente: string;
    turno: string;
}
