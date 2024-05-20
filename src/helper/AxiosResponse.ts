'use strict';

import type { AxiosResponse } from "axios";
import type { SweetAlertIcon } from "sweetalert2";

interface ErrorResponse {
    response?: {
        data?: {
            error?: { param: string; msg: string }[];
            msg?: string;
        };
    };
}

export default {
    success(res: AxiosResponse) {
        const response = {
            icon: "" as SweetAlertIcon,
            message: "" as string,
        };

        if (res.data && res.data.success) { response.icon = "success"; response.message = "Berhasil" }
        else if (res.data && res.data.msg) { response.icon = "error"; response.message = res.data.msg }
        else { response.icon = "error"; response.message = "Tidak diketahui" }

        return response;
    },
    error(error: ErrorResponse): string {
        let msg = 'Terjadi kesalahan pada sistem';

        try {
            if (error.response && error.response.data) {
                if (error.response.data.error && error.response.data.error.length > 0) {
                    const errors = error.response.data.error[0];
                    msg = `${errors.param} ${errors.msg}`;
                } else if (error.response.data.msg) {
                    msg = error.response.data.msg;
                }
            }
        } catch (err) {
            msg = err instanceof Error ? err.toString() : 'Unknown error';
        }

        return msg;
    },
};