export type PendingAction = "toggle" | "edit" | "delete" | null;

export type ActionErrorCode =
  | "UNAUTHORIZED"
  | "INVALID_TASK_DATA"
  | "TASK_NOT_FOUND"
  | "UNKNOWN_ERROR";

export type ActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      code: ActionErrorCode;
    };
