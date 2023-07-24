import { Body, Controller, Post } from "@nestjs/common";
import { PostPolicyService } from "../services/post-policy.service";
import { PostPolicyDto } from "src/dtos/post-policy.dto";

@Controller("postpolicy")
export class PostPolicyController {
  constructor(private readonly postPolicyService: PostPolicyService) {}

  @Post()
  generatePostPolicy(@Body() dto: PostPolicyDto) {
    const generatedPostPolicy = this.postPolicyService.generatePostPolicy(dto);
    return generatedPostPolicy;
  }
}
