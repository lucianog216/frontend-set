export interface Turnos {
    _id:     string; 
    nombre:   string;
    ingreso: string;
    salida: string;
    horas: number;
    colacion: string;     
    usuario: {_id:string,
        nombre:string};
    }