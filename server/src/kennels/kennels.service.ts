import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class KennelsService {
  constructor(private prisma: PrismaService) {}
  // create(createKennelDto: CreateKennelDto) {
  //   return 'This action adds a new kennel';
  // }
  // findAll() {
  //   return `This action returns all kennels`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} kennel`;
  // }
  // update(id: number, updateKennelDto: UpdateKennelDto) {
  //   return `This action updates a #${id} kennel`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} kennel`;
  // }
}
