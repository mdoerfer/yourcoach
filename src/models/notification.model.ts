export class Notification {
  private id: string;
  private to: string;
  private description: string;
  private read: boolean;
  private type: string;
  private additional_info: object;
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

  setAdditionalInfo(data: object) {
    this.additional_info = data;
    return this;
  }

  getAdditionalInfo(key: string) {
    return this.additional_info[key];
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
    let created_at = new Date(this.created_at);
    let now = new Date();

    let type = null;
    let diff = null;

    let timeDiff = Math.abs(now.getTime() - created_at.getTime());
    let diffHours = timeDiff / (1000 * 3600);
    let diffDays = timeDiff / (1000 * 3600 * 24);

    if(diffHours < 24) {
      type = 'Std.';
      diff = Math.ceil(diffHours);
    }
    else if(diffHours >= 24) {
      type = 'T.';
      diff = Math.ceil(diffDays);
    }

    return {
      type: type,
      diff: diff
    };
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
      case 'invite:accept':
        title = 'Einladung wurde akzeptiert';
        icon = 'mail-open';
        break;
      case 'invite:decline':
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
