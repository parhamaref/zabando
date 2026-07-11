import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { RuleEditorService } from "./rule-editor.service";

@Controller("rules")
export class RuleEditorController {
  constructor(private readonly service: RuleEditorService) {}

  @Get()
  getRules() {
    return this.service.getRules();
  }

  @Post()
  createRule(@Body() dto: any) {
    return this.service.createRule(dto);
  }

  @Put(":id")
  updateRule(@Param("id") id: string, @Body() dto: any) {
    return this.service.updateRule(id, dto);
  }

  @Delete(":id")
  deleteRule(@Param("id") id: string) {
    return this.service.deleteRule(id);
  }
}
