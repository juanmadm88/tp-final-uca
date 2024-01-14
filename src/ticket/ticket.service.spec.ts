import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { TicketService } from './ticket.service';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { UpdateTicketDTO } from './dtos/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { Seat } from '../autobus/entities/seat.entity';
import { TicketDTO } from './dtos/ticket.dto';
import { BadRequestException } from '@nestjs/common';
import { SeatType } from '../seat-type/entities/seat-type.entity';
import { UtilsService } from '../utils/utils.service';

describe('TripService', () => {
  let service: TicketService;
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  it('should be defined', async () => {
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: jest.fn
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              where: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => jest.fn()
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
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, ConfigService, UtilsService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    expect(service).toBeDefined();
  });
  it('expect update method to be successfully executed ', async () => {
    const ticket: Ticket = new Ticket();
    const seat: Seat = new Seat();
    seat.booked = true;
    ticket.seat = seat;
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn()
        };
      }
    };
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: mockedManager
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              where: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => ticket
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
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }, UtilsService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    expect(service).toBeDefined();
    await service.update(
      1,
      plainToInstance(UpdateTicketDTO, {
        cancelled: true
      })
    );
  });
  it('expect an error when update method fails ', async () => {
    const ticket: Ticket = new Ticket();
    const firstSeat: Seat = new Seat();
    const secondSeat: Seat = new Seat();
    secondSeat.booked = true;
    ticket.seat = firstSeat;
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn()
        };
      }
    };
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: mockedManager
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              where: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => Promise.reject({ error: 'some error' })
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
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }, UtilsService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    expect(service).toBeDefined();
    try {
      await service.update(
        1,
        plainToInstance(UpdateTicketDTO, {
          cancelled: true
        })
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect create method return a Bad Request Error when trying to booked reserved seat in another ticket', async () => {
    const secondSeat: Seat = new Seat();
    secondSeat.booked = true;
    const seat = secondSeat;
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn()
        };
      }
    };
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: mockedManager
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              where: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => seat
                    };
                  },
                  getOne: () => jest.fn()
                };
              }
            };
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }, UtilsService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    expect(service).toBeDefined();
    try {
      await service.create(
        plainToInstance(TicketDTO, {
          seat: { id: 1 },
          serviceType: {
            id: 2
          }
        })
      );
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
  it('expect an error when create method fails ', async () => {
    const secondSeat: Seat = new Seat();
    secondSeat.booked = false;
    const seat = secondSeat;
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn()
        };
      }
    };
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: mockedManager
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              innerJoinAndSelect: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      innerJoinAndSelect: () => {
                        return {
                          innerJoinAndSelect: () => {
                            return {
                              innerJoinAndSelect: () => {
                                return {
                                  where: () => {
                                    return {
                                      getOne: () => Promise.reject({ error: 'some error' })
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
              },
              where: () => {
                return {
                  getOne: jest.fn(),
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => seat
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
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }, UtilsService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    expect(service).toBeDefined();
    try {
      await service.create(
        plainToInstance(TicketDTO, {
          seat: { id: 1 },
          serviceType: {
            id: 2
          },
          trip: {
            id: 3
          }
        })
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect create method to be executed successfully', async () => {
    const firstSeat: Seat = new Seat();
    const secondSeat: Seat = new Seat();
    secondSeat.booked = false;
    firstSeat.seatType = new SeatType();
    secondSeat.seatType = new SeatType();
    secondSeat.seatType.description = 'asiento cama';
    firstSeat.seatType.description = 'asiento cama';
    const seat = firstSeat;
    const trip = {
      autobus: {
        seats: [{ id: 2, booked: true }],
        model: {
          description: 'doble piso'
        }
      },
      destination: {
        kilometer: 300
      },
      origin: {
        kilometer: 400
      }
    };
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn()
        };
      }
    };
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: mockedManager
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              innerJoinAndSelect: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      innerJoinAndSelect: () => {
                        return {
                          innerJoinAndSelect: () => {
                            return {
                              innerJoinAndSelect: () => {
                                return {
                                  where: () => {
                                    return {
                                      getOne: () => Promise.resolve(trip)
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
              },
              where: () => {
                return {
                  getOne: () => Promise.resolve({ description: 'primera clase' }),
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => seat
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
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }, UtilsService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    expect(service).toBeDefined();
    await service.create(
      plainToInstance(TicketDTO, {
        seat: { id: 2, booked: true },
        serviceType: {
          id: 2
        },
        trip: {
          id: 3
        },
        user: {
          id: 5
        }
      })
    );
  });
  it('expect findAll method to be executed successfully', async () => {
    const mockedUtilsService = {
      buildDTO: jest.fn(),
      buildQuery: jest.fn()
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn()
        };
      }
    };
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: mockedManager
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              innerJoinAndSelect: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      innerJoinAndSelect: () => {
                        return {
                          innerJoinAndSelect: () => {
                            return {
                              innerJoinAndSelect: () => {
                                return {
                                  innerJoinAndSelect: () => {
                                    return {
                                      where: () => {
                                        return {
                                          skip: () => {
                                            return {
                                              take: () => {
                                                return {
                                                  getMany: jest.fn()
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
              }
            };
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, ConfigService, { provide: UtilsService, useValue: mockedUtilsService }]
    }).compile();
    jest.spyOn(mockedUtilsService, 'buildDTO').mockImplementation(() =>
      plainToInstance(TicketDTO, [
        { id: 1, price: 129.1 },
        { id: 2, price: 230.3 }
      ])
    );
    service = module.get<TicketService>(TicketService);
    await service.findAll();
  });
  it('expect method createQueryRunner not to be executed ', async () => {
    const ticket: Ticket = new Ticket();
    const seat: Seat = new Seat();
    seat.booked = true;
    ticket.seat = seat;
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn()
        };
      }
    };
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: mockedManager
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              where: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => ticket
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
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }, UtilsService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    const spy = jest.spyOn(mockedDataSource.createQueryRunner().manager, 'getRepository');
    await service.update(1, plainToInstance(UpdateTicketDTO, {}));
    expect(spy).not.toBeCalled();
  });
  it('expect method update succesfully executed when receiving a serviceTypeDTO an seatDTO ', async () => {
    const ticket: Ticket = new Ticket();
    const seat: Seat = new Seat();
    seat.booked = true;
    ticket.seat = seat;
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn(),
          save: jest.fn()
        };
      }
    };
    const mockedWhere = {
      where: jest.fn()
    };
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: mockedManager
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return mockedWhere;
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }, UtilsService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    jest.spyOn(mockedWhere, 'where').mockImplementationOnce(() => {
      return {
        innerJoinAndSelect: () => {
          return {
            innerJoinAndSelect: () => {
              return {
                innerJoinAndSelect: () => {
                  return {
                    innerJoinAndSelect: () => {
                      return {
                        getOne: () =>
                          Promise.resolve({
                            seat: {
                              id: 2
                            },
                            serviceType: {
                              id: 1,
                              description: 'primera clase'
                            },
                            trip: {
                              id: 1
                            }
                          })
                      };
                    }
                  };
                }
              };
            }
          };
        }
      };
    });
    jest.spyOn(mockedWhere, 'where').mockImplementationOnce(() => {
      return {
        innerJoinAndSelect: () => {
          return {
            getOne: () =>
              Promise.resolve({
                booked: false,
                seatType: {
                  description: 'asiento cama'
                }
              })
          };
        }
      };
    });
    jest.spyOn(mockedWhere, 'where').mockImplementationOnce(() => {
      return {
        getOne: () =>
          Promise.resolve({
            description: 'primera clase'
          })
      };
    });
    jest.spyOn(mockedWhere, 'where').mockImplementationOnce(() => {
      return {
        innerJoinAndSelect: () => {
          return {
            innerJoinAndSelect: () => {
              return {
                innerJoinAndSelect: () => {
                  return {
                    innerJoinAndSelect: () => {
                      return {
                        innerJoinAndSelect: () => {
                          return {
                            getOne: () =>
                              Promise.resolve({
                                autobus: {
                                  seats: [{ id: 1 }, { id: 2 }],
                                  model: {
                                    description: 'piso simple'
                                  }
                                },
                                destination: {
                                  kilometer: 100
                                },
                                origin: {
                                  kilometer: 200
                                }
                              })
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
    });
    await service.update(
      1,
      plainToInstance(UpdateTicketDTO, {
        seat: {
          id: 1
        },
        serviceType: {
          id: 2
        }
      })
    );
  });
  it('expect Bad Request Error when trying to update a ticket with a seat that has been booked to another trip ', async () => {
    const ticket: Ticket = new Ticket();
    const seat: Seat = new Seat();
    seat.booked = true;
    ticket.seat = seat;
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn(),
          save: jest.fn()
        };
      }
    };
    const mockedWhere = {
      where: jest.fn()
    };
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: mockedManager
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return mockedWhere;
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }, UtilsService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    jest.spyOn(mockedWhere, 'where').mockImplementationOnce(() => {
      return {
        innerJoinAndSelect: () => {
          return {
            innerJoinAndSelect: () => {
              return {
                innerJoinAndSelect: () => {
                  return {
                    innerJoinAndSelect: () => {
                      return {
                        getOne: () =>
                          Promise.resolve({
                            seat: {
                              id: 2
                            },
                            serviceType: {
                              id: 1,
                              description: 'primera clase'
                            },
                            trip: {
                              id: 1
                            }
                          })
                      };
                    }
                  };
                }
              };
            }
          };
        }
      };
    });
    jest.spyOn(mockedWhere, 'where').mockImplementationOnce(() => {
      return {
        innerJoinAndSelect: () => {
          return {
            getOne: () =>
              Promise.resolve({
                booked: true,
                seatType: {
                  description: 'asiento cama'
                }
              })
          };
        }
      };
    });
    jest.spyOn(mockedWhere, 'where').mockImplementationOnce(() => {
      return {
        getOne: () =>
          Promise.resolve({
            description: 'primera clase'
          })
      };
    });
    jest.spyOn(mockedWhere, 'where').mockImplementationOnce(() => {
      return {
        innerJoinAndSelect: () => {
          return {
            innerJoinAndSelect: () => {
              return {
                innerJoinAndSelect: () => {
                  return {
                    innerJoinAndSelect: () => {
                      return {
                        innerJoinAndSelect: () => {
                          return {
                            getOne: () =>
                              Promise.resolve({
                                autobus: {
                                  seats: [{ id: 1 }, { id: 2 }],
                                  model: {
                                    description: 'piso simple'
                                  }
                                },
                                destination: {
                                  kilometer: 100
                                },
                                origin: {
                                  kilometer: 200
                                }
                              })
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
    });
    try {
      await service.update(
        1,
        plainToInstance(UpdateTicketDTO, {
          seat: {
            id: 1
          },
          serviceType: {
            id: 2
          }
        })
      );
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
