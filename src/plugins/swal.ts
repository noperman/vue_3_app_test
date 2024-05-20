import Swal, { type SweetAlertIcon } from "sweetalert2";

export default {
    swal: Swal,
    toast: Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    }),
    doToast: function (icon: SweetAlertIcon, title: String) {
        this.toast.fire({
            icon: icon,
            title: title
        })
    }
}