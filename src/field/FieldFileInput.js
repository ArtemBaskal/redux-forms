import React from "react";

export default class FieldFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      selectedFile: null,
      fileName: null
    };
  }

  componentWillReceiveProps() {
    this.setState({ selectedFile: null, fileName: null });
  }

  onChange(e) {
    this.getBase64(e.target.files[0]).then(base64 => {
      console.log(base64);
      this.props.input.onChange(base64.file);
      this.setState({
        selectedFile: base64.file,
        fileName: base64.fileName
      });
    });
  }

  getBase64 = file => {
    return new Promise((resolve, reject) => {
      console.log(file);
      const reader = new FileReader();
      reader.onload = () =>
        resolve({ file: reader.result, fileName: file.name });
      reader.onerror = error => reject(error);
      try {
        reader.readAsDataURL(file);
      } catch (e) {
        console.error(e);
      }
    });
  };

  render() {
    return (
      <div>
        <input
          style={{ display: "none" }}
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={this.onChange}
          ref={fileInput => (this.fileInput = fileInput)}
        />
        <button
          className="button-photo-select"
          onClick={e => {
            e.preventDefault();
            return this.fileInput.click();
          }}
        >
          <i className="fas fa-paperclip" />
          {" Прикрепить фото"}
        </button>
        <div className="add-photo-container">
          {this.state.selectedFile && (
            <img className="img-photo" src={this.state.selectedFile} alt="" />
          )}
          <div className="fileName-img-delete-container">
            <label className="label-fileName">{this.state.fileName}</label>
            {this.state.fileName && (
              <label
                className="label-img-delete"
                onClick={() => {
                  //TODO: ОБЯЗАТЕЛЬНО СДЕЛАТЬ УДАЛЕНИЕ НЕ ТОЛЬКО ВО VIEW
                  this.setState({ selectedFile: null, fileName: null });
                }}
              >
                Удалить
              </label>
            )}
          </div>
        </div>
      </div>
    );
  }
}
