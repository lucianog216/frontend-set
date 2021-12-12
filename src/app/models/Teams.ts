export interface Teams {
    color: string,
    _id:     string; 
    nombre:   string;
    nivel:  number;
    supervisor: {_id:string,
        nombre:string};      
    usuario: {_id:string,
        nombre:string};
        
    guardias:[{ _id: string,
        nombre: string}];

    }
