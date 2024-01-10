import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { UtilsService } from '../utils/utils.service';
import { DataSource } from 'typeorm';

describe('ReportService', () => {
  let service: ReportService;
  const mockedUtilsService = {
    buildQuery: jest.fn()
  };
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: DataSource, useValue: {} }]
    }).compile();
    service = module.get<ReportService>(ReportService);
    expect(service).toBeDefined();
  });
  it('expect getBilling to be executed', async () => {
    const mockedDataSource = {
      createQueryBuilder: () => {
        return {
          select: () => {
            return {
              from: () => {
                return {
                  innerJoin: () => {
                    return {
                      where: () => {
                        return {
                          getRawMany: jest.fn()
                        };
                      }
                    };
                  }
                };
              }
            };
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: DataSource, useValue: mockedDataSource }]
    }).compile();
    service = module.get<ReportService>(ReportService);
    await service.getBilling();
  });
  it('expect getTicketSold to be executed', async () => {
    const mockedDataSource = {
      createQueryBuilder: () => {
        return {
          select: () => {
            return {
              from: () => {
                return {
                  innerJoin: () => {
                    return {
                      where: () => {
                        return {
                          getRawMany: jest.fn()
                        };
                      }
                    };
                  }
                };
              }
            };
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: DataSource, useValue: mockedDataSource }]
    }).compile();
    service = module.get<ReportService>(ReportService);
    await service.getTicketSold();
  });
  it('expect getNumberOfTrips to be executed', async () => {
    const mockedDataSource = {
      createQueryBuilder: () => {
        return {
          select: () => {
            return {
              from: () => {
                return {
                  innerJoin: () => {
                    return {
                      innerJoin: () => {
                        return {
                          groupBy: () => {
                            return {
                              addGroupBy: () => {
                                return {
                                  where: () => {
                                    return {
                                      getRawMany: jest.fn()
                                    };
                                  }
                                };
                              }
                            };
                          }
                        };
                      }
                    };
                  }
                };
              }
            };
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: DataSource, useValue: mockedDataSource }]
    }).compile();
    service = module.get<ReportService>(ReportService);
    await service.getNumberOfTrips();
  });
});
