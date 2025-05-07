
export const STATUS = {
  SUCCESS : "success",
  FAIL : "fail",
  ERROR : "error"
};

export class CustomError extends Error {
  constructor(msg, statCode, statusTxt) {
    super();
    this.message = msg;
    this.statusCode = statCode;
    this.statusText = statusTxt;
  }
}

