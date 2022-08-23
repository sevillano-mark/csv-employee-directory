/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from "@nestjs/testing";
import { CommunityService } from "src/services/community.service";
import { CommunityController } from "./community.controller";
import { QueryPagination } from "src/dto/query-pagination.dto";
import { Community } from "src/models/community.schema";

describe("CommunityController", () => {
  let communityController: CommunityController;
  let communityService: CommunityService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: CommunityService,
      useFactory: () => ({
        getAllCommunities: jest.fn(() => []),
        getCommunity: jest.fn(() => []),
        createCommunity: jest.fn(() => {}),
        updateCommunity: jest.fn(() => {}),
        deleteCommunity: jest.fn(() => {}),
        searchByName: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [CommunityService, ApiServiceProvider],
    }).compile();

    communityController = app.get<CommunityController>(CommunityController);
    communityService = app.get<CommunityService>(CommunityService);
  });

  describe("getAllCommunities", () => {
    it("should return an array of communities", async () => {
      const result = [new Community()];
      const params = new QueryPagination();
      jest.spyOn(communityService, "findAll").mockResolvedValue(result);

      expect(await communityController.getAllCommunities(params)).toBe(result);
    });
  });

  // it("calling getAllCommunities method", async () => {
  //   const param = new QueryPagination();

  //   expect(await communityController.getAllCommunities(param)).toThrow(
  //     InternalServerErrorException
  //   );
  //   // expect(communityService.findAll).toHaveBeenCalled();
  //   // expect(communityService.findAll).toHaveBeenCalledWith(param);
  //   // expect(communityService.findAll).toThrow(InternalServerErrorException);
  // });

  // it("calling getCommunity method", () => {
  //   const param = 1;
  //   communityController.getCommunity(param);
  //   expect(communityService.findOne).toHaveBeenCalled();
  //   expect(communityService.findOne).toHaveBeenCalledWith(param);
  // });

  // it("calling createCommunity method", () => {
  //   const dto = new CommunityCreateDto();
  //   communityController.createCommunity(dto);
  //   expect(communityService.create).toHaveBeenCalled();
  //   expect(communityService.create).toHaveBeenCalledWith(dto);
  // });

  // it("calling updateCommunity method", () => {
  //   const dto = new CommunityCreateDto();
  //   const id = 1;
  //   communityController.updateCommunity(id, dto);
  //   expect(communityService.update).toHaveBeenCalled();
  //   expect(communityService.update).toHaveBeenCalledWith(id, dto);
  // });

  // it("calling deleteCommunity method", () => {
  //   const id = 1;
  //   communityController.deleteCommunity(id);
  //   expect(communityService.delete).toHaveBeenCalled();
  //   expect(communityService.delete).toHaveBeenCalledWith(id);
  // });

  // it("calling searchByName method", () => {
  //   const term = "a";
  //   const param = new QueryPagination();
  //   communityController.searchByName(param, term);
  //   expect(communityService.findByName).toHaveBeenCalled();
  //   expect(communityService.findByName).toHaveBeenCalledWith(param, term);
  // });
});
