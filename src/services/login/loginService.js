import API from "../../components/API/API";

const loggon = (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let urlencoded = new URLSearchParams();
            urlencoded.append("user", btoa(formData.user));
            urlencoded.append("password", btoa(formData.password));
            urlencoded.append("entorno", btoa(formData.entor));
            const res = await API.post(process.env.fmk_frmwk6 + 'login', urlencoded);
            resolve(res.data);
        }
        catch (e) {
            reject(e);
        }
    })
};

export default loggon;