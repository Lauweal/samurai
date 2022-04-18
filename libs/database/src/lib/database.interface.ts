import { ModuleMetadata } from "@nestjs/common";

export interface IDatabaseModuleOptions extends Pick<ModuleMetadata, 'imports'> {

}
