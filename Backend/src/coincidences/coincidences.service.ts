import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Coincidence, CoincidenceDocument } from "./schemas/coincidence.schema";
import { Fecha, FechaDocument } from "./schemas/fecha.schema";
import { Totales, TotalesDocument } from "./schemas/totales.schema";
import {
  Data_coleccion,
  Data_coleccionDocument,
} from "./schemas/arr_data.schema";

@Injectable()
export class CoincidencesService {
  constructor(
    @InjectModel(Coincidence.name)
    private CoincidenceModel: Model<CoincidenceDocument>,
    @InjectModel(Fecha.name)
    private FechaModel: Model<FechaDocument>,
    @InjectModel(Totales.name)
    private TotalesModel: Model<TotalesDocument>,
    @InjectModel(Data_coleccion.name)
    private Data_coleccionModel: Model<Data_coleccionDocument>
  ) {}

  async findData() {
    const start = process.hrtime();
    let casos = {
      identidad: "",
      nombre: "",
      apellidos: "",
      situacion: "",
      direccion: "",
      estado: "",
      fecha_de_nacimiento: "",
      pais: " ",
      provincia: " ",
      municipio: " ",
      situacion_academica: " ",
      grupo: " ",
      regimen_de_estudio: " ",
      sexo: " ",
      tipo_de_estudiante: " ",
      ano_de_estudio: " ",
      edad: 0,
      referencia: 0,
      cantidad: 0,
      coincidencias: [],
    };

    let modalidad = {
      name_modalidad: "",
      num_danger: 0,
      num_warn: 0,
      num_info: 0,
      num_safe: 0,
      casos: [],
    };

    let carrera = {
      name_carrera: "",
      num_danger: 0,
      num_warn: 0,
      num_info: 0,
      num_safe: 0,
      modalidad: [],
    };

    let facultad = {
      name_facultad: "",
      num_danger: 0,
      num_warn: 0,
      num_info: 0,
      num_safe: 0,
      carrera: [],
    };

    let arr_facultad = [];
    let arr_carrera = [];
    let arr_modalidad = [];
    let data;
    let last_update;
    let cont_safe_modalidad;
    let cont_info_modalidad;
    let cont_war_modalidad;
    let cont_danger_modalidad;
    let cont_safe_carrera;
    let cont_info_carrera;
    let cont_war_carrera;
    let cont_danger_carrera;
    let cont_safe_facultad;
    let cont_info_facultad;
    let cont_war_facultad;
    let cont_danger_facultad;
    let cont_safe_total = 0;
    let cont_info_total = 0;
    let cont_war_total = 0;
    let cont_danger_total = 0;
    let sum = new Totales();
    let fecha;
    let fe;

    try {
      const fs = require('fs');
      var a = 1;
      let file = fs.readFileSync('./src/coincidences/SIGENU_coincidences.json', {encoding:'utf8', flag:'r'});
      let date = { fecha: "" };
      const json = JSON.parse(file);
      console.log
      last_update = json.actualizacion;
      data = json.casos;
      data = data.sort();
      date.fecha = last_update;
      let fecha_bd = await this.FechaModel.find({});
      if (fecha_bd.length == 0) {
        fecha = "";
      } else {
        fecha = await this.FechaModel.find().limit(1).sort({ $natural: -1 });
        fe = fecha[0].fecha;
      }

      if (fe == last_update) {
        const Totales = await this.TotalesModel.find({});
        // const Show_data = await this.Data_coleccionModel.find({});
        const Fechas = await this.FechaModel.find({});
        const Coincidences = await this.CoincidenceModel.find({});
        // const Filter= Coincidences[0].name_facultad;
        //  const Filter1= Coincidences[0].carrera[0].modalidad[0].casos;
        //  const Fac_fill = Filter.find({name_modalida:"Curso por encuentros"});
        const end = process.hrtime(start);
        console.info(`El programa demoro ${end} s`);
        // console.log(Filter);
        // console.log(Filter1);
      }
      console.log("Procesing...");
      console.log("Deleting old data...");
      const del_coincidence = await this.CoincidenceModel.deleteMany({});
      const del_total = await this.TotalesModel.deleteMany({});
      const del_data = await this.Data_coleccionModel.deleteMany({});
      const NewDate = await this.FechaModel.create(date);
      NewDate.save();
      let cont_ff = 0;
      for (let i of data) {
        if (arr_facultad.indexOf(i.facultad_filial) < 0) {
          // ${id}
          console.log("Loading facultades...");
          arr_facultad.push(i.facultad_filial);
        }
        if (arr_carrera.indexOf(i.carrera) < 0) {
          console.log("Loading carreras...");
          arr_carrera.push(i.carrera);
        }
        if (arr_modalidad.indexOf(i.tipo_de_curso) < 0) {
          console.log("Loading modalidades...");
          arr_modalidad.push(i.tipo_de_curso);
        }
        switch (i.situacion) {
          case "Safe":
            ++cont_safe_total;
            break;
          case "Info":
            ++cont_info_total;
            break;
          case "Warning":
            ++cont_war_total;
            break;
          case "Danger":
            ++cont_danger_total;
            break;
          default:
            throw Error("Estado invalido");
            break;
        }
        const Data = await this.Data_coleccionModel.create(i);
        Data.save();
        ++cont_ff;
      }
      console.log("Adding data to the Document");
      console.log("Loading totales...");
      sum.num_danger_totales = cont_danger_total;
      sum.num_info_totales = cont_info_total;
      sum.num_safe_totales = cont_safe_total;
      sum.num_warn_totales = cont_war_total;

      const Total = await this.TotalesModel.create(sum);
      Total.save();
      let cont = 0;
      let cont_fa = 0;
      let cont_ca = 0;
      let cont_mod = 0;
      let cont_ifa = 0;
      for (let d of arr_facultad) {
        console.info(
          `Recorriendo ${cont_ifa}   de ${arr_facultad.length} facultades  ... `
        );
        let var3 = [];
        cont_safe_facultad = 0;
        cont_info_facultad = 0;
        cont_war_facultad = 0;
        cont_danger_facultad = 0;
        let cont_ica = 0;
        for (let c of arr_carrera) {
          console.info(
            `Recorriendo ${cont_ica}   de ${arr_carrera.length} carreras  ... `
          );
          let var2 = [];
          cont_safe_carrera = 0;
          cont_info_carrera = 0;
          cont_war_carrera = 0;
          cont_danger_carrera = 0;
          let cont_imod = 0;
          for (let b of arr_modalidad) {
            console.info(
              `Recorriendo ${++cont_imod}   de ${
                arr_modalidad.length
              } modalidades  ... `
            );
            let var1 = [];
            cont_safe_modalidad = 0;
            cont_info_modalidad = 0;
            cont_war_modalidad = 0;
            cont_danger_modalidad = 0;
            for (let a of data) {
              cont++;
              if (a.facultad_filial == d) {
                if (a.carrera == c) {
                  if (a.tipo_de_curso == b) {
                    switch (a.situacion) {
                      case "Safe":
                        ++cont_safe_modalidad;
                        break;
                      case "Info":
                        ++cont_info_modalidad;
                        break;
                      case "Warning":
                        ++cont_war_modalidad;
                        break;
                      case "Danger":
                        ++cont_danger_modalidad;
                        break;
                      default:
                        throw Error("Estado invalido");
                        break;
                    }
                    casos = {
                      identidad: a.identidad,
                      nombre: a.nombre,
                      apellidos: a.apellidos,
                      situacion: a.situacion,
                      direccion: a.direccion,
                      fecha_de_nacimiento: a.fecha_de_nacimiento,
                      coincidencias: a.coincidencias,
                      pais: a.pais,
                      estado: a.estado,
                      provincia: a.provincia,
                      municipio: a.municipio,
                      situacion_academica: a.situacion_academica,
                      grupo: a.grupo,
                      regimen_de_estudio: a.regimen_de_estudio,
                      sexo: a.sexo,
                      tipo_de_estudiante: a.tipo_de_estudiante,
                      ano_de_estudio: a.ano_de_estudio,
                      edad: a.edad,
                      referencia: a.referencia,
                      cantidad: a.cantidad,
                    };
                    var1.push(casos);
                  }
                }
              }
            }
            modalidad = {
              name_modalidad: b,
              num_danger: cont_danger_modalidad,
              num_warn: cont_war_modalidad,
              num_info: cont_info_modalidad,
              num_safe: cont_safe_modalidad,
              casos: var1,
            };
            cont_safe_carrera += cont_safe_modalidad;
            cont_info_carrera += cont_info_modalidad;
            cont_war_carrera += cont_war_modalidad;
            cont_danger_carrera += cont_danger_modalidad;
            cont_mod++;
            var2.push(modalidad);
          }

          cont_ca++;
          carrera = {
            name_carrera: c,
            num_danger: cont_danger_carrera,
            num_warn: cont_war_carrera,
            num_info: cont_info_carrera,
            num_safe: cont_safe_carrera,
            modalidad: var2,
          };
          //console.log( var2);
          var3.push(carrera);
          cont_safe_facultad += cont_safe_carrera;
          cont_info_facultad += cont_info_carrera;
          cont_war_facultad += cont_war_carrera;
          cont_danger_facultad += cont_danger_carrera;
        }

        cont_fa++;

        facultad = {
          name_facultad: d,
          num_danger: cont_danger_facultad,
          num_warn: cont_war_facultad,
          num_info: cont_info_facultad,
          num_safe: cont_safe_facultad,
          carrera: var3,
        };

        const CoincidenceCreated = await this.CoincidenceModel.create(facultad);
        CoincidenceCreated.save();
      }
      console.log(`El programa iteró ${cont + cont_ff} veces`);
      console.log("Almost there...");
      const Totales = await this.TotalesModel.find({});
      const Show_data = await this.Data_coleccionModel.find({});
      const Fechas = await this.FechaModel.find({});
      const Coincidences = await this.CoincidenceModel.find({});
      console.log("Saving data...");
      const end = process.hrtime(start);
      console.info(`El programa demoro ${end} s`);
    } catch (error) {
      console.log(error);
      const Totales = await this.TotalesModel.find({});
      const Show_data = await this.Data_coleccionModel.find({});
      const Fechas = await this.FechaModel.find({});
      const Coincidences = await this.CoincidenceModel.find({});
      const end = process.hrtime(start);
      console.info(`El programa demoro ${end} s`);
    }
  }

  async findTotales() {
    return await this.TotalesModel.find();
  }

  async findTotalesSituacion() {
    let total_situacion = [];
    let situacion = [];
    let situacion1 = {
      situacion: "",
      cantidad: 0,
    };
    const mod = await this.Data_coleccionModel.find();
    for (let i of mod) {
      if (situacion.indexOf(i.situacion_academica) < 0) {
        situacion.push(i.situacion_academica);
      }
    }
    for (let j of situacion) {
      let cont = 0;
      for (let i of mod) {
        if (i.situacion_academica === j) {
          cont++;
        }
      }
      situacion1 = {
        situacion: j,
        cantidad: cont,
      };
      total_situacion.push(situacion1);
    }
    return total_situacion;
  }

  async findTotalesModalidad() {
    let total_modalidad = [];
    let modalidad = [];
    let modal1 = {
      modalidad: "",
      cantidad: 0,
    };

    const mod = await this.Data_coleccionModel.find();
    for (let i of mod) {
      if (modalidad.indexOf(i.tipo_de_curso) < 0) {
        modalidad.push(i.tipo_de_curso);
      }
    }

    for (let j of modalidad) {
      let cont = 0;
      for (let i of mod) {
        if (i.tipo_de_curso == j) {
          cont++;
        }
      }
      modal1 = {
        modalidad: j,
        cantidad: cont,
      };
      total_modalidad.push(modal1);
    }

    return total_modalidad;
  }

  async findArbol() {
    return await this.CoincidenceModel.find();
  }

  async findCoincidencesSede() {
    let sede = {
      _id: "",
      name_facultad: "",
      num_danger: 0,
      num_warn: 0,
      num_info: 0,
      num_safe: 0,
      carrera: [],
    };

    let sedes = [];

    const arbol = await this.CoincidenceModel.find();

    for (let i of arbol) {
      if (i.name_facultad.includes("SUM") || i.name_facultad.includes("CUM")) {
        sede = {
          _id: i._id,
          name_facultad: i.name_facultad,
          num_danger: i.num_danger,
          num_warn: i.num_warn,
          num_info: i.num_info,
          num_safe: i.num_safe,
          carrera: i.carrera,
        };
        sedes.push(sede);
      }
    }

    return sedes;
  }

  async findCoincidencesFacultad() {
    let facultad = {
      _id: "",
      name_facultad: "",
      num_danger: 0,
      num_warn: 0,
      num_info: 0,
      num_safe: 0,
      carrera: [],
    };

    let facultades = [];

    const arbol = await this.CoincidenceModel.find();

    for (let i of arbol) {
      if (i.name_facultad.includes("Facultad")) {
        facultad = {
          _id: i._id,
          name_facultad: i.name_facultad,
          num_danger: i.num_danger,
          num_warn: i.num_warn,
          num_info: i.num_info,
          num_safe: i.num_safe,
          carrera: i.carrera,
        };
        facultades.push(facultad);
      }
    }
    return facultades;
  }

  async findCoincidencesCarrera(facultad: string) {
    let carrera = {
      name_carrera: "",
      num_danger: 0,
      num_warn: 0,
      num_info: 0,
      num_safe: 0,
    };

    let carreras = [];

    const arbol = await this.CoincidenceModel.find();

    for (let i of arbol) {
      if (i.name_facultad == facultad) {
        for (let j of i.carrera) {
          carrera = {
            name_carrera: j.name_carrera,
            num_danger: j.num_danger,
            num_warn: j.num_warn,
            num_info: j.num_info,
            num_safe: j.num_safe,
          };
          if (
            j.num_danger !== 0 ||
            j.num_warn !== 0 ||
            j.num_info !== 0 ||
            j.num_safe !== 0
          ) {
            carreras.push(carrera);
          }
        }
      }
    }
    return carreras;
  }

  async findCoincidencesModalidad(facultad: string, carrera: string) {
    let modalidad = {
      name_modalidad: "",
      num_danger: 0,
      num_warn: 0,
      num_info: 0,
      num_safe: 0,
    };

    let modalidades = [];

    const arbol = await this.CoincidenceModel.find();

    for (let i of arbol) {
      if (i.name_facultad == facultad) {
        for (let j of i.carrera) {
          if (j.name_carrera == carrera) {
            for (let k of j.modalidad) {
              modalidad = {
                name_modalidad: k.name_modalidad,
                num_danger: k.num_danger,
                num_warn: k.num_warn,
                num_info: k.num_info,
                num_safe: k.num_safe,
              };
              if (
                k.num_danger !== 0 ||
                k.num_warn !== 0 ||
                k.num_info !== 0 ||
                k.num_safe !== 0
              ) {
                modalidades.push(modalidad);
              }
            }
          }
        }
      }
    }
    return modalidades;
  }

  async findCoincidencesCaso(
    facultad: string,
    carrera: string,
    modalidad: string
  ) {
    let caso = {
      identidad: "",
      nombre: "",
      apellidos: "",
      situacion: "",
      direccion: "",
      fecha_de_nacimiento: "",
      coincidencias: [],
      pais: "",
      estado: "",
      provincia: "",
      municipio: "",
      situacion_academica: "",
      grupo: "",
      regimen_de_estudio: "",
      sexo: "",
      tipo_de_estudiante: "",
      ano_de_estudio: "",
      edad: 0,
      referencia: 0,
      cantidad: 0,
    };

    let casos = [];

    const arbol = await this.CoincidenceModel.find();

    for (let i of arbol) {
      if (i.name_facultad == facultad) {
        for (let j of i.carrera) {
          if (j.name_carrera == carrera) {
            for (let l of j.modalidad) {
              if (l.name_modalidad == modalidad) {
                for (let c of l.casos) {
                  caso = {
                    identidad: c.identidad,
                    nombre: c.nombre,
                    apellidos: c.apellidos,
                    situacion: c.situacion,
                    direccion: c.direccion,
                    fecha_de_nacimiento: c.fecha_de_nacimiento,
                    coincidencias: c.coincidencias,
                    pais: c.pais,
                    estado: c.estado,
                    provincia: c.provincia,
                    municipio: c.municipio,
                    situacion_academica: c.situacion_academica,
                    grupo: c.grupo,
                    regimen_de_estudio: c.regimen_de_estudio,
                    sexo: c.sexo,
                    tipo_de_estudiante: c.tipo_de_estudiante,
                    ano_de_estudio: c.ano_de_estudio,
                    edad: c.edad,
                    referencia: c.referencia,
                    cantidad: c.cantidad,
                  };
                  casos.push(caso);
                }
              }
            }
          }
        }
      }
    }
    return casos;
  }

  async findOne(id: string) {
    console.info(`El id es ${id} `);
    const a = await this.Data_coleccionModel.find({ identidad: id });
    if (a.length != 0) {
      console.log("a" + a);
      return a;
    } else {
      const b = await this.Data_coleccionModel.find({ nombre: id });
      if (b.length != 0) {
        console.log("b" + b);
        return b;
      } else {
        const c = await this.Data_coleccionModel.find({ apellidos: id });
        if (c.length != 0) {
          console.log("c" + c);
          return c;
        } else {
          const d = await this.Data_coleccionModel.find({ referencia: id });
          if (d.length != 0) {
            console.log("d" + d);
            return d;
          } else {
            return a;
          }
        }
      }
    }
  }

  async findCasosSignificativos() {

    let caso = {
      identidad:" ",
      nombre: "",
      apellidos: "",
      situacion: "",
      direccion: "",
      estado: "",
      fecha_de_nacimiento: "",
      pais: " ",
      provincia: " ",
      municipio: " ",
      situacion_academica: " ",
      regimen_de_estudio: " ",
      sexo: " ",
      tipo_de_estudiante: " ",
      ano_de_estudio: " ",
      edad: "",
      referencia: "",
      cantidad: "",
      coincidencias: [],
    };
    let casos = [];
    const cas = await this.Data_coleccionModel.find();
    console.log(cas[0]);
    for(let i=0; i<5; i++)
    {
      caso = {
      identidad: cas[i].identidad,
      nombre: cas[i].nombre,
      apellidos: cas[i].apellidos,
      situacion: cas[i].situacion,
      direccion: cas[i].direccion,
      estado: cas[i].estado,
      fecha_de_nacimiento: cas[i].fecha_de_nacimiento,
      pais: cas[i].pais,
      provincia: cas[i].provincia,
      municipio: cas[i].municipio,
      situacion_academica: cas[i].situacion_academica,
      regimen_de_estudio: cas[i].regimen_de_estudio,
      sexo: cas[i].sexo,
      tipo_de_estudiante: cas[i].tipo_de_estudiante,
      ano_de_estudio: cas[i].ano_de_estudio,
      edad: cas[i].edad,
      referencia: cas[i].referencia,
      cantidad: cas[i].cantidad,
      coincidencias: cas[i].coincidencias,
      }
      casos.push(caso);
    };
    return casos;
  }


}
