export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    status: number;
    details?: unknown;
  };
}

export class AppApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = 'AppApiError';
    this.status = status;
    this.details = details;
  }
}
