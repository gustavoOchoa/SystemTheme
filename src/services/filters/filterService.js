import API from "../../components/API/API";

const getFormInputs = (id_menu, n_grid) => {
    return new Promise(async (resolve, reject) => {
        try {
            var urlencoded = new URLSearchParams();
            urlencoded.append("id_menu", id_menu);
            urlencoded.append("n_grid", n_grid);
            const res = await API.post(process.env.fmk_frmwk6 + 'filters', urlencoded);
            resolve(res.data);
        }
        catch (e) {
            reject(e);
        }
    })
}

export default getFormInputs;