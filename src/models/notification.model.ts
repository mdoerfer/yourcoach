export class Notification {
  private id: string;
  private to: string;
  private description: string;
  private read: boolean;
  private type: string;
  private created_at: number;
  private updated_at: number;

  constructor() {
    this.created_at = new Date().valueOf();
    this.updated_at = new Date().valueOf();
    this.read = false;
  }

  load(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
    }

    return this;
  }

  setId(data: string) {
    this.id = data;
    return this;
  }

  getId() {
    return this.id;
  }

  setTo(data: string) {
    this.to = data;
    return this;
  }

  getTo() {
    return this.to;
  }

  setDescription(data: string) {
    this.description = data;
    return this;
  }

  getDescription() {
    return this.description;
  }

  setRead(data: boolean) {
    this.read = data;
    return this;
  }

  getRead() {
    return this.read;
  }

  setType(data: string) {
    this.type = data;
    return this;
  }

  getType() {
    return this.type;
  }

  setCreatedAt(data: number) {
    this.created_at = data;
    return this;
  }

  getCreatedAt() {
    return this.created_at;
  }

  setUpdatedAt(data: number) {
    this.updated_at = data;
    return this;
  }

  getUpdatedAt() {
    return this.updated_at;
  }

  getDaysSinceCreation() {
    let now = new Date().valueOf();

    return now - this.created_at;
  }

  getInfo() {
    let title = '';
    let icon = '';

    switch(this.getType()) {
      case 'task:new':
        title = 'Du hast einen neuen Task';
        icon = 'checkmark-circle';
        break;
      case 'task:graded':
        title = 'Dein Task wurde bewertet';
        icon = 'star';
        break;
      case 'task:done':
        title = 'Ein Task wurde erledigt';
        icon = 'checkmark-circle';
        break;
      case 'task:grade':
        title = 'Bitte Task bewerten';
        icon = 'star';
        break;
      case 'chat:new-message':
        title = 'Du hast eine neue Nachricht';
        icon = 'chatboxes';
        break;
      case 'reminder':
        title = 'Du hast eine Erinnerung';
        icon = 'alarm';
        break;
      case 'invite:new':
        title = 'Du hast eine Einladung';
        icon = 'mail';
        break;
      case 'task:accept':
        title = 'Einladung wurde akzeptiert';
        icon = 'mail-open';
        break;
      case 'task:decline':
        title = 'Einladung wurde abgelehnt';
        icon = 'alert';
        break;
      default:
        title = ':)'
    }

    return {
      title: title,
      icon: icon
    };
  }
}
