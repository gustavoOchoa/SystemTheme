import style from './Loader.module.css';

const Loader = (props) => (
    <>
        <div className={style.back_loader}></div>
        <div id={style.boxLoader}>
            <div className='d-flex align-items-center justify-content-center h-100 w-100'>
                <div className={["row", style.centered_box].join(" ")}>
                    <div className="col-6 spinner-border text-primary justify-content-center" role="status"></div>
                    <div className={[style.texto_loader, "col-6"].join(" ")}>{props.text? props.text : ''}</div>
                </div>
            </div>
        </div>
    </>
);

export default Loader ;