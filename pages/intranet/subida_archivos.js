import React, { useState } from 'react';
import { FilePond } from 'react-filepond'
import API from "../../src/components/API/API";


function SubidaArchivos(props) {
    const [files, setFiles] = useState('');
    const [serverResponse, setServerResponse] =useState('');
    let creditos = {'Gustavo': 'lorem'};
    return (
        <>
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                server={{
                    process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                        const formData = new FormData();
                        formData.append(fieldName, file, file.name);
                        formData.append('archivo', 'file');
                        formData.append('nombre_proceso', 'levantar_archivo');

                        let res = await API.post(process.env.fmk_frmwk6 + 'uploadfile', formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            }
                        });
                        if (res.data.error === 'OK') {
                            // the load method accepts either a string (id) or an object
                            load(res.data.disco);
                        } else {
                            // Can call the error method if something is wrong, should exit after
                            setServerResponse(res.data.message);
                            error(res.data.message);
                        }

                        return {
                            abort: () => {
                                // This function is entered if the user has tapped the cancel button
                                res.abort();
                                // Let FilePond know the request has been cancelled
                                abort();
                            },
                        };
                    },
                }}
                labelFileProcessingError={()=> serverResponse }
                labelFileProcessing={'Subiendo Archivo'}
                labelFileProcessingComplete={'Completado'}
                labelTapToCancel={'cliquee para cancelar'}
                labelTapToRetry={'cliquee para intentar de nuevo'}
                labelTapToUndo={'cliquee para deshacer'}
                name="file"
                credits={creditos}
                labelIdle='Arrastre su archivo aqui o <span class="filepond--label-action">Examine</span>'
            />
        </>
    )
}

export default SubidaArchivos;