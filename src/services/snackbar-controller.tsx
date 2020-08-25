import $ from "jquery";

export function showSnackbar(status: "SUCCESS" | "ERROR", message: string) {
  new Promise((resolve, reject) => {
    try {
      let snackbar = $(".snackbar");

      if (!snackbar.hasClass("show")) {
        snackbar.addClass("show");
        snackbar.addClass(status === "SUCCESS" ? "snack-exitosa" : "snack-danger");
        snackbar.text(message);
      }
      setTimeout(() => {
        snackbar.removeClass(["snack-exitosa", "snack-danger", "show"]);
        resolve();
      }, 3000);
    } catch (error) {
      reject(error);
    }
  });
}
