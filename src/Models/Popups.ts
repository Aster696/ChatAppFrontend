import Swal from "sweetalert2";

export class Popups{
    
    basicAlert(ti: string, tex: string, ic: any): void{
        Swal.fire({
            title: ti,
            text: tex,
            icon: ic
        });
    }

    basicTimeAlert(ti: string, tex: string, ic: any, time: number): void{
        Swal.fire({
            title: ti,
            text: tex,
            icon: ic,
            timer: time
        });
    }

    tostAlert(ti: string, tex: string, ic: any): void{
        Swal.fire({
            title: ti,
            text: tex,
            icon: ic,
            toast: true
        });
    }

    tostTimeAlert(ti: string, tex: string, ic: any, time: number): void{
        Swal.fire({
            title: ti,
            text: tex,
            icon: ic,
            timer: time,
            toast: true
        });
    }

}