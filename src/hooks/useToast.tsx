import { useCallback } from "react"
import Swal from "sweetalert2"

export const useToast = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
        }
    })

    const showToast = useCallback(
       (icon: "success" | "error" | "warning" | "info", titleMessage: string, message: string) => {
           Toast.fire({
               icon,
               html: `
               <div class="flex flex-col leading-3">
                    <p class="text-slate-950 font-semibold text-sm">${titleMessage}</p>
                    <p class="text-slate-600 font-medium text-xs">${message}</p>
                </div>
               `,
           })
       },
       [Toast]
    )

    return { showToast }
}