import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CoincidencesService } from "./coincidences.service";
@ApiTags("Coincidences")
@Controller("coincidences")
export class CoincidencesController {
  constructor(private readonly CoincidencesService: CoincidencesService) {}

  @Get()
  async findData() {
    return await this.CoincidencesService.findData();
  }

  @Get("/totales")
  async findTotales() {
    return await this.CoincidencesService.findTotales();
  }

  @Get("/totales_modalidad")
  async findTotalesModalidad() {
    return await this.CoincidencesService.findTotalesModalidad();
  }

  @Get("/totales_situacion")
  async findTotalesSituacion() {
    return await this.CoincidencesService.findTotalesSituacion();
  }

  @Get("/arbol")
  async finfArbol() {
    return await this.CoincidencesService.findArbol();
  }

  @Get("/coincidences_sede")
  async findCoincidencesSede() {
    return await this.CoincidencesService.findCoincidencesSede();
  }

  @Get("/coincidences_facultad")
  async findCoincidencesFacultad() {
    return await this.CoincidencesService.findCoincidencesFacultad();
  }

  @Get("/coincidences_carrera/:facultad")
  async findCoincidencesCarrera(@Param("facultad") facultad: string) {
    return await this.CoincidencesService.findCoincidencesCarrera(facultad);
  }

  @Get("/coincidences_modalidad/:facultad/:carrera")
  async findCoincidencesModalidad(
    @Param("facultad") facultad: string,
    @Param("carrera") carrera: string
  ) {
    return await this.CoincidencesService.findCoincidencesModalidad(
      facultad,
      carrera
    );
  }

  @Get("/coincidences_caso/:facultad/:carrera/:modalidad")
  async findCoincidencesCaso(
    @Param("facultad") facultad: string,
    @Param("carrera") carrera: string,
    @Param("modalidad") modalidad: string
  ) {
    return await this.CoincidencesService.findCoincidencesCaso(
      facultad,
      carrera,
      modalidad
    );
  }
  @Get("/casosSignificativos")
  findCasosSignificativos() {
    return this.CoincidencesService.findCasosSignificativos();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.CoincidencesService.findOne(id);
  }
}
