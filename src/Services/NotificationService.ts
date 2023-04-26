import { Notyf } from "notyf";

class NotificationService {
  private notify = new Notyf({ duration: 4000, position: { x: "center", y: "top" } });

  public success(message: string): void {
    this.notify.success(message);
  }

  public error(error: any): void {
    const errorMessage = this.extractErrorMessage(error);
    this.notify.error(errorMessage);
  }

  private extractErrorMessage(error: any): string {
    //front throw a string as error
    if (typeof error === "string") {
      return error;
      //Axios got an errors string from back
    }
    if (typeof error.response?.data === "string") {
      return error.response.data;
    }
    if (typeof error.response?.data.message === "string") {
      return error.response.data.message;
      //Axios got an error array from back
    }
    if (Array.isArray(error.response?.data)) {
      return error.response.data[0];
      //front threw an Error
    }
    if (typeof error.message === "string") {
      return error.message;

    } return "Some error occurred, please try again";
  }

}
const notificationService = new NotificationService();
export default notificationService;