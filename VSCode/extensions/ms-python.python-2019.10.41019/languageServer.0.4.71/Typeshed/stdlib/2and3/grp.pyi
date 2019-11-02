from typing import List, NamedTuple, Optional

struct_group = NamedTuple("struct_group", [("gr_name", str),
                                           ("gr_passwd", Optional[str]),
                                           ("gr_gid", int),
                                           ("gr_mem", List[str])])

def getgrall() -> List[struct_group]: ...
def getgrgid(gid: int) -> struct_group: ...
def getgrnam(name: str) -> struct_group: ...
