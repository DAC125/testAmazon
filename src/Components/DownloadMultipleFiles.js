

const downloadFile = (name, file) => {
    // console.log(request.certificate)
  const downloadLink = document.createElement("a");
  const fileName =  name+ ".pdf";

  downloadLink.href = file;
  downloadLink.download = fileName;
  downloadLink.click();
};

const downloadRequestFiles = (request) => {
    downloadFile(request.seq+"-declaracion", request.declaration)
    downloadFile(request.seq+"-certicacion", request.certificate)
    downloadFile(request.seq+"-pago", request.paymentProof)
}

export default (props) => {
  const requests = props.requests

  requests.map(x => downloadRequestFiles(x))
};
