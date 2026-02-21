import { v7 as uuid, validate } from 'uuid';
import { InvalidArgumentError } from '../error/invalid-argument-error';

export class ProjectId {
  private constructor(public readonly value: string) {}

  private static validate(id: string): boolean {
    return validate(id);
  }

  static generate(): ProjectId {
    return new ProjectId(uuid());
  }

  static of(id: string): ProjectId {
    if (!this.validate(id)) {
      throw new InvalidArgumentError(`Invalid ProjectId: ${id}`);
    }
    return new ProjectId(id);
  }

  toString(): string {
    return this.value;
  }
}

export class Project {
  constructor(
    public readonly id: ProjectId,
    public readonly title: string,
    public readonly description: string,
  ) {}

  static create(title: string, description: string = ''): Project {
    return new Project(ProjectId.generate(), title, description);
  }

  static of(data: ReturnType<Project['toJSON']>): Project {
    return new Project(ProjectId.of(data.id), data.title, data.description);
  }

  toJSON() {
    return {
      id: this.id.toString(),
      title: this.title,
      description: this.description,
    };
  }

  setTitle(title: string) {
    return new Project(this.id, title, this.description);
  }

  setDescription(description: string) {
    return new Project(this.id, this.title, description);
  }

  duplicate(): Project {
    return new Project(ProjectId.generate(), this.title, this.description);
  }
}
