import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiResponse } from 'src/common/dto/api-response';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}
  private readonly logger = new Logger(AuthorsController.name);

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    const newAuth = await this.authorsService.create(createAuthorDto);
    if (newAuth === null) return new ApiResponse(400, 'Invalid input', null);

    return new ApiResponse(200, 'Create new author', newAuth);
  }

  @Get()
  async findAll() {
    const authors = await this.authorsService.findAll();
    this.logger.log(authors);
    const code = authors !== null ? 200 : 500;
    const message = code === 200 ? 'Successfully!' : 'Something failed!';

    return new ApiResponse(code, message, authors);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const author = await this.authorsService.findOne(id);
    const code = author !== null ? 200 : 500;
    const message = code === 200 ? 'Successfully!' : 'Something failed!';
    return new ApiResponse(code, message, author);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const checkAuth = await this.authorsService.findOne(id);
    if (checkAuth === null)
      return new ApiResponse(400, 'Author not exist', null);

    await this.authorsService.remove(id);
    return new ApiResponse(200, 'Author deleted', checkAuth);
  }
}
