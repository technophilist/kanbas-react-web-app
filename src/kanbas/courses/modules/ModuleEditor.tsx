type ModuleEditorProps = {
    dialogTitle: string;
    moduleName: string;
    setModuleName: (name: string) => void;
    addModule: () => void
}

function ModuleEditor(props: ModuleEditorProps) {
    return (
        <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {props.dialogTitle}
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <input
                            className="form-control"
                            defaultValue={props.moduleName}
                            placeholder="Module Name"
                            onChange={(e) => props.setModuleName(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button onClick={props.addModule} type="button" data-bs-dismiss="modal"
                                className="btn btn-danger">
                            Add Module
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModuleEditor