export class UserCreatedEvent {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}
