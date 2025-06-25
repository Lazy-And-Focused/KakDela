export class SelfError<T> {
  public readonly successed: false = false;
  public readonly error: Error;
  public readonly resource: T;
  public readonly text: string;

  public constructor(
    error: Error|string,
    data?: {
      resource?: T,
      text?: string
    } 
  ) {
    this.error = typeof error === "string" ? new Error(error) : error;
    
    if (data) {
      this.text = data.text || this.error.message;
      this.resource = data.resource || null;
    }
  }
};

export class SelfStatus<T> {
  public readonly successed: true = true;
  public readonly error: null = null;

  public readonly text: string;
  public readonly resource: T;

  public constructor(
    resource: T,
    text: string
  ) {
    this.resource = resource;
    this.text = text;
  }
};