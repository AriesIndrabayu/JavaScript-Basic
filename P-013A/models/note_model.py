from sqlalchemy import Column, Integer, String
from database.connection import Base


class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    judul = Column(String(100))
    isi = Column(String(255))
