export const envioLinkAPI = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({ ok: true, data: "", errorMessage: "" });
        }, 700);

    });

}