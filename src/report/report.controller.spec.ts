import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Logger } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/auth.guard';
describe('ReportController', () => {
  let controller: ReportController;
  const mockedService = {
    getTicketSold: jest.fn(),
    getBilling: jest.fn(),
    getPeopleTransported: jest.fn(),
    getNumberOfTrips: jest.fn(),
    getKmTravelled: jest.fn()
  };
  const mockedAuthGuard = {
    canActivate: jest.fn()
  };
  const mockedLogger = {
    log: jest.fn()
  };
  const mockedUtilsService = {
    buildOptions: jest.fn(),
    throwInternalServerIfErrorIsNotHttpExcetion: jest.fn()
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [
        { provide: ReportService, useValue: mockedService },
        { provide: Logger, useValue: mockedLogger },
        { provide: UtilsService, useValue: mockedUtilsService }
      ]
    })
      .overrideGuard(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();
    controller = app.get<ReportController>(ReportController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('expect getKmTravelled method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'getKmTravelled').mockImplementation(() => Promise.resolve({ status: 200 }));
    await controller.getKmTravelled('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when getKmTravelled method fails ', async () => {
    jest.spyOn(mockedService, 'getKmTravelled').mockImplementation(() => Promise.reject({ status: 200 }));
    try {
      await controller.getKmTravelled('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect getTicketSold method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'getTicketSold').mockImplementation(() => Promise.resolve({ status: 200 }));
    await controller.getTicketSold('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when getTicketSold method fails ', async () => {
    jest.spyOn(mockedService, 'getTicketSold').mockImplementation(() => Promise.reject({ status: 200 }));
    try {
      await controller.getTicketSold('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect getBilling method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'getBilling').mockImplementation(() => Promise.resolve({ status: 200 }));
    await controller.getBilling('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when getBilling method fails ', async () => {
    jest.spyOn(mockedService, 'getBilling').mockImplementation(() => Promise.reject({ status: 200 }));
    try {
      await controller.getBilling('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect getPeopleTransported method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'getPeopleTransported').mockImplementation(() => Promise.resolve({ status: 200 }));
    await controller.getPeopleTransported('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when getPeopleTransported method fails ', async () => {
    jest.spyOn(mockedService, 'getPeopleTransported').mockImplementation(() => Promise.reject({ status: 200 }));
    try {
      await controller.getPeopleTransported('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect getTrips method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'getNumberOfTrips').mockImplementation(() => Promise.resolve({ status: 200 }));
    await controller.getTrips('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when getTrips method fails ', async () => {
    jest.spyOn(mockedService, 'getNumberOfTrips').mockImplementation(() => Promise.reject({ status: 200 }));
    try {
      await controller.getTrips('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
