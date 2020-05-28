export interface EmailRequest {
  to?: string;
  subject?: string;
  templateKey?: string;
  data?: any;
}
